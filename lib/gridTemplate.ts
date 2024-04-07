import { articleCollection_T, templateConfig_T } from "@/app/types/articles";
import { idArrayGenerator } from "./helper";

export function refreshTemplate(
    articles: articleCollection_T,
    oldConfig: templateConfig_T
): templateConfig_T {
    if (!articles.length)
        return {
            gridTemplateArea: "",
            areas: [],
            availableSpace: 0,
        };

    if (oldConfig.availableSpace < articles.length) {
        const [areas, newTemplateArea] = generateSubTemplate();
        return {
            gridTemplateArea: oldConfig.gridTemplateArea + newTemplateArea,
            areas: [...oldConfig.areas, ...areas],
            availableSpace: oldConfig.availableSpace + areas.length,
        };
    } else {
        //I know its stupid..
        return oldConfig;
    }
}

function generateSubTemplate(): [string[], string] {
    let areas: string[];
    let gridTemplateArea: string;
    let grid2D: string[][];
    const caseValue = Math.floor(Math.random() * 2);
    switch (caseValue) {
        case 0:
            areas = idArrayGenerator(4, 2).map((id) => `area_${id}`);
            /*
                a a b b
                a a c d
            */
            grid2D = [
                [areas[0], areas[0], areas[0], areas[0]],
                [areas[1], areas[1], areas[1], areas[1]],
            ];
            break;
        default:
            areas = idArrayGenerator(4, 2).map((id) => `area_${id}`);
            /*
                    a a b b
                    a a c d
                */
            grid2D = [
                [areas[0], areas[0], areas[1], areas[1]],
                [areas[0], areas[0], areas[1], areas[1]],
            ];
            break;
        // case 0:
        //     areas = idArrayGenerator(4, 4).map((id) => `area_${id}`);
        //     /*
        //         a a b b
        //         a a c d
        //     */
        //     grid2D = [
        //         [areas[0], areas[0], areas[1], areas[1]],
        //         [areas[0], areas[0], areas[2], areas[3]],
        //     ];
        //     break;

        // case 1:
        //     areas = idArrayGenerator(4, 3).map((id) => `area_${id}`);
        //     /*
        //         a b b c
        //         a b b c
        //     */
        //     grid2D = [
        //         [areas[0], areas[1], areas[1], areas[2]],
        //         [areas[0], areas[1], areas[1], areas[2]],
        //     ];
        //     break;

        // case 2:
        //     areas = idArrayGenerator(4, 3).map((id) => `area_${id}`);
        //     /*
        //         a a a a
        //         b b c c
        //     */
        //     grid2D = [
        //         [areas[0], areas[0], areas[0], areas[0]],
        //         [areas[1], areas[1], areas[2], areas[2]],
        //     ];
        //     break;
        // default:
        //     areas = idArrayGenerator(4, 3).map((id) => `area_${id}`);
        //     /*
        //         a a b b
        //         a a c c
        //     */
        //     grid2D = [
        //         [areas[0], areas[0], areas[1], areas[1]],
        //         [areas[0], areas[0], areas[2], areas[2]],
        //     ];
    }

    gridTemplateArea =
        "'" + grid2D.map((arr) => arr.join(" ")).join("' '") + "'" + " ";

    return [areas, gridTemplateArea];
}
