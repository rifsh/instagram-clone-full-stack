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
    _id: string;
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
    likes: [{
        _id: string,
        username: string,
        profilePic: string
    }];
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
export interface LikesInterface {
    _id: string,
    username: string,
    profilePic: string
}
export interface userPostsInterface {
    _id:string;
    image: string;
    caption: string;
}
export interface PostCommentInterface {
    _id: string;
    text: string;
    author: {
        _id: string;
        username: string;
        profilePic: string;
    }
    post: string;
    liek: [string];
    date: Date
}
export interface ViewCommentsInterface {
    messages: string;
    datas: [PostCommentInterface]
}