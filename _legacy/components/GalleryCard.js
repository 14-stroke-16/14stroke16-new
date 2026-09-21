import Image from "next/image";
import Link from "next/link";



export default function GalleryCard({ galleryItem }) {

const {
  galleryImageTitle,
  slug,
  galleryThumbnail,
  galleryThumbnailAltTag,
  googleDriveLink
} = galleryItem.fields;
    
    
    return (
      <div className="masonry-item py-3">
        <div>
          {/* <Link href={`gallery/${slug}`}> */}
            <Link href={`${googleDriveLink}`} target="_blank">
                    
            <h3 className="text-sm md:text-md font-bold  uppercase pb-3">
              {galleryImageTitle}
            </h3>        
            <Image
              src={`https:${galleryThumbnail.fields.file.url}`}
              width={500}
              height={600}
              alt={galleryThumbnailAltTag}
            />

            
          </Link>
        </div>
      </div>
    );
}
