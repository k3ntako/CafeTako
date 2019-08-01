import FetchHelper from './FetchHelper';

export default class User{
  constructor( ){
  }

  static login( email, password ){
    FetchHelper.post('/api/v1/users/login', { email, password });
  }

  static signUp(props){
    const rubyProps = FetchHelper.convertToRubySyntax( props );
    FetchHelper.post('/api/v1/users/signup', rubyProps);
  }

  static logout(){
    FetchHelper.post('/api/v1/users/logout');
  }

}
