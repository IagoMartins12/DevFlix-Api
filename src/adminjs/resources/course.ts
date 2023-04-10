// src/adminjs/resources/course.ts

import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const courseResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
    filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'featured', 'categoryId'],
    showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}

//Configuração de onde que os cursos irão ser armazenados 
export const courseResourceFeatures: FeatureType[] = [
    uploadFileFeature ({
        provider: {
            local: {
                bucket: path.join(__dirname, ".." , '..', '..', 'public')
            }
        }, 
        properties: {
            key: 'thumbnailUrl', 
            file: 'uploadThumbnail'
        }, 
        uploadPath : (record,filename) => `thumbnails/course-${record.get('id')}/${filename}`
    })
]