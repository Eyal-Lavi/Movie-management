import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps){
    
    const [linkModels , setLinkModels] = useState<linkModel[]>([]);
    const selectPage = (link: linkModel) =>{
            if(link.page === props.currentPage){
                return;
            }
            if(!link.enabled){
                return;
            }

            props.onChange(link.page);
    }

    const getClass= (link: linkModel) => {
        if(link.active){
            return "active pointer";
        }
        if(!link.enabled){ // אם הוא לא זמין
            return "disabled";
        }

        return "pointer";
    }
    useEffect(()=>{
       const previousPageEnabled =  props.currentPage !== 1; // כל עמוד חוץ מהראשון
       const previousPage = props.currentPage - 1; // העמוד הקודם 
       const links: linkModel[] = [];

       links.push({
        text: 'Previous',
        enabled: previousPageEnabled,
        page: previousPage,
        active: false,
       });

       for(let i = 1; i <= props.totalAmountOfPages; i++){
            const startPage = props.currentPage - props.radio;  //  מציין כמה עמודים לפני העמוד הנוכחי יוצגו
            const endPage = props.currentPage + props.radio; // מציין כמה עמודים אחרי העמוד הנוכחי יוצגו
            if(i >= startPage && i <= endPage){
                links.push({
                    text: `${i}`,
                    active: props.currentPage === i,
                    enabled: true,
                    page: i,
                   });
            }
       }

       const nextPageEnabled = props.currentPage !== props.totalAmountOfPages &&
            props.totalAmountOfPages > 0;

       const nextPage = props.currentPage + 1;
       links.push({
        text: 'Next',
        page: nextPage,
        enabled: nextPageEnabled,
        active: false,
       });

       setLinkModels(links);
    },[props.currentPage, props.totalAmountOfPages, props.radio]);

    return <nav>
        <ul className="pagination justify-content-center">
            {linkModels.map(link => (<li key={link.text}
                onClick={()=> selectPage(link)}
                className={`page-item cursor ${getClass(link)}`}
                >
                    <span className="page-link">{link.text}</span>
                </li>
            ))}
        </ul>
    </nav>   
}

interface linkModel{
    page: number; // מספר עמוד
    enabled: boolean; // זמין ללחיצה
    text: string;
    active: boolean; // עמוד מופעל נוכחי 
}

interface paginationProps{
    currentPage: number; // עמוד נוכחי
    totalAmountOfPages: number; // כמות העמודים בסהכ
    radio: number;// כמה עמודים יוצגו מכל צד
    onChange(page: number): void;
}

Pagination.defaultProps = {
    radio : 3,
}