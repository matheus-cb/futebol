import * as bcrypt from 'bcryptjs';

const adminUserMock = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjk5NDgwMTE4fQ.7S_9o1yBGUMGpkIXOB9KpW7PQJupyqViN2s7_kFk9QA"
  // senha: secret_admin
}
const adminUserWithHashedPassword = {
  username: 'admin',
  role: 'admin',
  email: adminUserMock.email,
  password: bcrypt.hashSync(adminUserMock.password, 10),
}

const userIvalid = {
  username: 'admin',
  role: 'admin',
  email: 'admin@gg.com',
  password: bcrypt.hashSync('secret_admin', 10)
}

const passwordIvalid = {
  email: 'admin@admin.com',
  password: 'nem',
};
const INVALID_DATA = {
  status: 'INVALID_DATA',
  data: { message: 'Invalid email or password' },
};
const missingUserDataError = {
  status: 400,
  data: { message: 'All fields must be filled' },
};

const emptyUserCredentials = {
  email: '',
  password: '',
  token: ''

}
export {
  adminUserMock,
  userIvalid,
  passwordIvalid,
  adminUserWithHashedPassword,
  INVALID_DATA,
  missingUserDataError,
  emptyUserCredentials
}
