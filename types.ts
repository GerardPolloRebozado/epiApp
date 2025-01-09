export type UserType = {
    admin: boolean,
    close: boolean,
    course_code: string,
    credits: number,
    ctime: string,
    editable: true,
    events: any,
    firstname: string,
    gpa: [
        {
            gpa: string,
            cycle: string,
        }
    ]
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

type EventAssistant = {
    login: string;
    title: string;
    picture: string;
    manager_status: string;
};

export type EventType = {
    code: string;
    num_event: string;
    seats: string;
    title: string | null;
    description: string | null;
    nb_inscrits: string;
    begin: string;
    end: string;
    id_activite: string;
    location: string;
    nb_max_students_projet: string | null;
    already_register: string | null;
    user_status: string;
    allow_token: string;
    assistants: EventAssistant[];
};

type StudentRegisteredType = {
    registered: string;
};

export type ActivityExtendedType = {
    scolaryear: string;
    codemodule: string;
    codeinstance: string;
    codeacti: string;
    call_ihk: string;
    slug: string | null;
    instance_location: string;
    module_title: string;
    title: string;
    description: string;
    type_title: string;
    type_code: ActivityCode
    begin: string;
    start: string;
    end_register: string | null;
    deadline: string | null;
    end: string;
    nb_hours: string;
    nb_group: number;
    num: number;
    register: string;
    register_by_bloc: string;
    register_prof: string;
    title_location_type: string | null;
    is_projet: boolean;
    id_projet: string | null;
    project_title: string | null;
    is_note: boolean;
    nb_notes: string | null;
    is_blocins: boolean;
    rdv_status: string;
    id_bareme: string | null;
    title_bareme: string | null;
    archive: string;
    hash_elearning: string | null;
    ged_node_adm: string;
    nb_planified: number;
    hidden: boolean;
    project: string | null;
    student_registered: StudentRegisteredType;
    events: EventType[];
};

export type ModuleType = {
    barrage: number,
    codeinstance: string,
    codemodule: string,
    credits: number,
    cycle: string,
    date_ins: string,
    grade: string,
    id_user_history: string,
    scolaryear: number,
    title: string,
    notes: NotesType[]
}

export type NotesType = {
    codeacti: string,
    codeinstance: string,
    codemodule: string,
    comment: string,
    correcteur: string,
    date: string,
    final_note: number,
    scolaryear: number,
    title: string,
    titlemodule: string
}

export type MarksType = {
    modules: ModuleType[],
    notes: NotesType[]
}