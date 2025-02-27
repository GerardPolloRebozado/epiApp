export type UserType = {
  admin: boolean;
  close: boolean;
  course_code: string;
  credits: number;
  ctime: string;
  editable: true;
  events: any;
  firstname: string;
  gpa: [
    {
      gpa: string;
      cycle: string;
    },
  ];
  groups: any;
  id_history: string;
  id_promo: string;
  internal_email: string;
  invited: boolean;
  lastname: string;
  location: string;
  login: string;
  mtime: string;
  picture: string;
  picture_fun?: string;
  promo: string;
  restrictprofiles: boolean;
  rights: {};
  school_code: string;
  school_id: number;
  school_title: string;
  scholaryear: string;
  semester: number;
  semester_code: string;
  shell?: string;
  studentyear: number;
  title: string;
  userdocs?: string;
  userinfo: any;
};

type BaseActivityType = {
  scolaryear: string;
  codemodule: string;
  codeinstance: string;
  codeacti: string;
  title: string;
  description: string;
  begin: string;
  end: string;
};

export type Activity = BaseActivityType & {
  title_module: string;
  code_location: string;
  begin_event: string | null;
  end_event: string | null;
  seats: number | null;
  num_event: number | null;
  type_acti: string;
  type_acti_code: string | 'proj' | 'class' | 'rdv' | 'other' | 'tp' | 'exam';
  acti_title: string;
  num: string;
  begin_acti: string;
  end_acti: string;
  registered: number;
  info_creneau: string | null;
  project: string;
  rights: string[];
};

export type ActivityType = 'activity' | 'project';
export type ActivityCode = Activity['type_acti_code'];

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

export type ActivityExtendedType = BaseActivityType & {
  call_ihk: string;
  slug: string | null;
  instance_location: string;
  module_title: string;
  type_title: string;
  type_code: ActivityCode;
  start: string;
  end_register: string | null;
  deadline: string | null;
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
  barrage: number;
  codeinstance: string;
  codemodule: string;
  credits: number;
  cycle: string;
  date_ins: string;
  grade: string;
  id_user_history: string;
  scolaryear: number;
  title: string;
  notes: NotesType[];
};

export type NotesType = {
  codeacti: string;
  codeinstance: string;
  codemodule: string;
  comment: string;
  correcteur: string;
  date: string;
  final_note: number;
  scolaryear: number;
  title: string;
  titlemodule: string;
};

export type MarksType = {
  modules: ModuleType[];
  notes: NotesType[];
};

export type ProjectType = BaseActivityType & {
  call_ihk: string;
  closed: boolean;
  date_access: boolean;
  deadline: string;
  forum_path: string | null;
  id_activite: string;
  instance_allowed: string;
  instance_location: string;
  instance_registered: string;
  is_rdv: boolean;
  module_title: string;
  nb_max: number;
  nb_min: number;
  nb_notes: number;
  notregistered: {
    course_code: string;
    credits: number;
    cycle: string;
    date_ins: string;
    flags: any;
    grade: string;
    location: string;
    login: string;
    picture: string;
    promo: number;
    semester: string;
    title: string;
  }[];
  over: number;
  over_deadline: number;
  project_title: string;
  register: boolean;
  register_by_bloc: string;
  register_prof: string;
  registered: {
    closed: boolean;
    code: string;
    final_note: string | null;
    id: string;
    master: {
      date_ins: string;
      date_modif: string | null;
      login: string;
      picture: string;
      status: string;
      title: string;
    };
    members: any;
    repository: string;
    title: string;
  }[];
  registered_instance: number;
  root_slug: string;
  slug: string;
  type_code: string;
  type_title: string;
  urls: Array<{
    notation: boolean;
    title: string;
    link: string;
  }>;
  user_project_code: string;
  user_project_master: string;
  user_project_status: string;
  user_project_title: string;
};

export type AppointmentType = BaseActivityType & {
  description: string;
  events: {
    begin: string;
    date_ins: string | null;
    date_modif: string | null;
    end: string;
    id: string;
    location: string;
    nb_registered: string;
    num_event: string;
    register: string;
    title: string;
  }[];
  group: {
    code: string;
    id: number;
    inscrit: boolean;
    master: string;
    members: any[];
    title: string;
  }[];
  instance_location: string;
  module_title: string;
  nb_notes: number;
  nb_registered: number;
  nb_slots_full: number;
  project: {
    codeinstance: string;
    codemodule: string;
    id: number;
    scolaryear: string;
    title: string;
  };
  projects: {
    codeacti: string;
    id_projet: string | null;
    title: string;
  }[];
  registe_by_bloc: boolean;
  slots: {
    bloc_status: 'open' | 'closed';
    codeevent: string;
    id: number;
    room: string;
    slots: {
      acti_title: string;
      bloc_status: 'open' | 'closed';
      code: string | null;
      date: string;
      date_ins: string | null;
      duration: number;
      id: number;
      id_team: string | null;
      id_user: string | null;
      master: {
        login: string;
        picture: string;
        title: string;
      } | null;
      members: any[];
      members_pictures: any[];
      module_title: string;
      past: number;
      status: string;
      title: string | null;
    }[];
    title: string;
  }[];
  student_registered: boolean;
  title: string;
  with_project: boolean;
};
