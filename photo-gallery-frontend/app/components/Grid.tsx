import Image from 'next/image'
import PhotoViewer from "@/app/components/PhotoViewer";
import FileUploader from "@/app/components/FileUploader";
export default function Grid() {
    return (
        <section className={""}>
            <div className="grid grid-cols-5 grid-flow-row-dense gap-5 p-10">
            <PhotoViewer alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
                <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
                <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
                <Image className="rounded-2xl" alt={"image-1"} width={280} height={120} src={"/image.jfif"}/>
            </div>
            <div className={"flex justify-end"}>
                <FileUploader/>
            </div>
        </section>

    )
}