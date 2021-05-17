type TRolesHierarchy = {
  [key: string]: string[];
};

const ROLES_HIERARCHY: TRolesHierarchy = {
  'check-out staff': ['check-out staff'],
  'chief librarian': [
    'chief librarian',
    'departmental associate librarian',
    'check-out staff',
    'reference librarian',
  ],
  'departmental associate librarian': [
    'departmental associate librarian',
    'check-out staff',
    'reference librarian',
  ],
  'reference librarian': ['reference librarian', 'check-out staff'],
};

export default ROLES_HIERARCHY;
