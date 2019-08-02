import FetchHelper from './FetchHelper';

const createNewUser = ( props ) => {
  const { email, birthday } = props;
  const firstName = props.first_name;
  const lastName = props.last_name;

  if( !email || !firstName || !lastName ){
    console.error("Invalid props for new user");
    return null;
  }
  return new User({ email, firstName, lastName, birthday });
}

export default class User{
  constructor(props){
    const { email, firstName, lastName, birthday } = props;

    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthday = birthday;
  }

  get email(){ return this._email }
  get firstName(){ return this._firstName }
  get lastName(){ return this._lastName }
  get birthday(){ return this._birthday }

  static currentUser(){
    return FetchHelper.post('/api/v1/users/currentUser').
      then(responseJSON => createNewUser(responseJSON));
  }

  static login( email, password ){
    return FetchHelper.post('/api/v1/users/login', { email, password }).
      then(responseJSON => createNewUser(responseJSON));
  }

  static signUp(props){
    const rubyProps = FetchHelper.convertToRubySyntax( props );
    return FetchHelper.post('/api/v1/users/signup', rubyProps).
      then(responseJSON => createNewUser(responseJSON));;
  }

  static logout(){
    return FetchHelper.post('/api/v1/users/logout');
  }

}
