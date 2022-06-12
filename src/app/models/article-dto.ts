export interface ArticleDto {
    id:string,
    topic:string,
    authorId:string,
    authorFirstname:string,
    authorSecondname:string,
    fileName:string,
    curriculumId:string,
    curriculumName:string,
    publishedTime:string,
    anotation:string,
    photoPath:string
}

export class ArticleClass {
    id:string = "";
    topic:string = "";
    authorId:string = "";
    authorFirstname:string = "";
    authorSecondname:string = "";
    fileName:string = "";
    curriculumId:string = "";
    curriculumName:string = "";
    publishedTime:string = "";
    anotation:string = "";
    photoPath:string = "";
}

export interface ArticleCreateDto {
    topic:string,
    authorId:string,
    authorName:string,
    fileName:string,
    curriculumId:string,
    curriculumName:string,
    publishedTime:string,
    anotation:string,
    photoPath:string
}
