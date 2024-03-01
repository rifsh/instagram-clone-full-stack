export interface PostInterface {
    postedBy: string;
    caption: string;
    mediaType: string;
    image: string;
    hashtags: [string];
    likes: [string];
    comments: [string];
    createdAt: Date;
    updatedAt: Date;
    location: {
        type: string,
        coordinates: [string]
    }
}

export interface PostResponseInterface {
    message: string,
    datas: PostInterface
}
export interface ViewpostInterface {
    message: string,
    _id:string;
    postedBy:
    {
        _id: string,
        username: string,
        profilePic: string
    }
    ;
    caption: string;
    mediaType: string;
    image: string;
    hashtags: [string];
    likes: [string];
    comments: [string];
    createdAt: Date;
    updatedAt: Date;
    location: {
        type: string,
        coordinates: [string]
    }
}
export interface GetPostInterface {
    message: string,
    datas: [ViewpostInterface];

}