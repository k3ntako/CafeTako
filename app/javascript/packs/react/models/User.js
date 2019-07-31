import FetchHelper from './FetchHelper';

export default class User{
  constructor( ){
  }

  static login( email, password ){
    FetchHelper.post('/api/v1/users/login', { email, password })
  }

}
