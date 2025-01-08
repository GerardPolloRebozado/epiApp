export type UserType = {
    admin: boolean,
    close: boolean,
    course_code: string,
    credits: number,
    ctime: string,
    editable: true,
    events: any,
    firstname: string,
    gpa: any,
    groups: any,
    id_history: string,
    id_promo: string,
    internal_email: string,
    invited: boolean,
    lastname: string,
    location: string,
    login: string,
    mtime: string,
    picture: string,
    picture_fun?: string,
    promo: string,
    restrictprofiles: boolean,
    rights: {},
    school_code: string,
    school_id: number,
    school_title: string,
    scholaryear: string,
    semester: number,
    semester_code: string,
    shell?: string,
    studentyear: number,
    title: string,
    userdocs?: string,
    userinfo: any,
}

export type Activity = {
    title_module: string;
    codemodule: string;
    scolaryear: string;
    codeinstance: string;
    code_location: string;
    begin_event: string | null;
    end_event: string | null;
    seats: number | null;
    num_event: number | null;
    type_acti: string;
    type_acti_code: string | "proj" | "class" | "rdv" | "other" | "tp" | "exam"
    codeacti: string;
    acti_title: string;
    num: string;
    begin_acti: string;
    end_acti: string;
    registered: number;
    info_creneau: string | null;
    project: string;
    rights: string[];
};

export type ActivityType = "activity" | "project"
export type ActivityCode = Activity['type_acti_code']