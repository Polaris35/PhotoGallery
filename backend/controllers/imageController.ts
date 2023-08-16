import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { UploadedFile } from "express-fileupload";
import { Picture } from "@prisma/client";
import { verify } from "jsonwebtoken";

export const uploadImage = async (req:Request, res:Response) => {
    try {
    
    if (!req.files || !req.files.selectedFile) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    const selectedFile = req.files.selectedFile as UploadedFile;

    const image = await prisma.picture.create({
            data: {
                name: selectedFile.name,
                data: selectedFile.data,
                userId: req.user.userId,
                Album: 'home'
            }
        });

    res.status(201).send({
        imgId: image.id,
        name: image.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}

export const getImage = async (req:Request, res:Response) => {
    const imageId = req.params.imageId;

    const token = req.params.token;
    const secretJwt = process.env.JWT_SECRET

    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        verify(token, secretJwt);
    } catch (ex) {
        res.status(401).send("Invalid token.");
    }
    
    try{
        const image = await prisma.picture.findUnique({where:{
            id: imageId
        }})

        if(!image) {
            res.status(404).json({ error: 'image not found' });
            return;
        }

        const imgRaw = Buffer.from(image.data)
        res.writeHead(200, {
            'Content-Length': imgRaw.length,
            'Content-Type': `image/${image.name.split('.').reverse()[0]}`
        });

        res.end(imgRaw);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download image' });
    }
}

export const getImagesList = async (req:Request, res:Response) => {
    
    const userId = req.user.userId;

    try{
        const images = await prisma.picture.findMany({where:{
            userId: userId
        }})
        if(!images)
        {
            res.status(404).json({ error: 'images not found' });
            return;
        }
        const imageDetails = images.map((item: Picture) => {
            return {
                imgId: item.id,
                name: item.name
            }
        })
        res.status(200).send(imageDetails);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load images list' });
    }
}