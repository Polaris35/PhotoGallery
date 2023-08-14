import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { UploadedFile } from "express-fileupload";
import { Picture } from "@prisma/client";

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

    res.status(201).send(`http://localhost:8080/api/image/image/${image.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
}

export const getImage = async (req:Request, res:Response) => {
    const imageId = req.params.imageId;
    
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
        const imagePaths = images.map((item: Picture) => {
            return `http://localhost:8080/api/image/image/${item.id}`
        })
        res.status(200).send(imagePaths);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load images list' });
    }
}