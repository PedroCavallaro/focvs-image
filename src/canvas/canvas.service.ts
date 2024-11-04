import { Injectable } from "@nestjs/common";
import * as sharp from "sharp"

@Injectable()
export class CanvasService {

    async generateWorkoutCover() {
        try {
            
            const imagesPaths = ["../images/1.jpg", "../images/2.jpg", "../images/3.jpg"]
            
            const [image1, image2, image3] = await Promise.all(
                imagesPaths.map(path => sharp(path))
            );
            
            const { width: width1, height: height1 } = await image1.metadata();
            const { width: width2, height: height2 } = await image2.metadata();
            const { width: width3, height: height3 } = await image3.metadata();
        
            const outputWidth = Math.max(width1, width2, width3);
        
            const outputHeight = height1 + height2 + height3;
        
            const resizedImages = await Promise.all([
              image1.resize(outputWidth).toBuffer(),
              image2.resize(outputWidth).toBuffer(),
              image3.resize(outputWidth).toBuffer(),
            ]);
        
            
            await sharp({
              create: {
                width: outputWidth,
                height: outputHeight,
                channels: 3,
                background: { r: 255, g: 255, b: 255 }, 
              }
            })
              .composite([
                { input: resizedImages[0], top: 0, left: 0 },
                { input: resizedImages[1], top: height1, left: 0 },
                { input: resizedImages[2], top: height1 + height2, left: 0 },
              ])
              .toFile("../images");
        } catch (error) {
            console.log(error);
        }
        
          
    }

}