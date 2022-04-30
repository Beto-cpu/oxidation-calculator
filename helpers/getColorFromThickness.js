import { colors } from '../constants/index';
import mixColors from './mixColors';

export default function getColorFromThickness(thickness){
    try{
        const relativeThickness = thickness % 1.54;
        
        for(let i = 0; i < colors.length; i++){
            if(relativeThickness == colors[i].thickness){
                let name = colors[i].name;
                let value = mixColors(colors[i].hex, colors[i].hex, 1);

                return {name, value};
            }
            if(relativeThickness < colors[i + 1].thickness){
                let percentage = (relativeThickness - colors[i].thickness) / (colors[i + 1].thickness - colors[i].thickness);
                let name = `${colors[i].name} - ${colors[i + 1].name}`;
                let value = mixColors(colors[i + 1].hex, colors[i].hex, percentage);

                return {name, value};
            }
        }

        return {name: '', value: ''};
    } catch(error){
        return {name: '', value: 'rgb(255,255,255)'};
    }
};