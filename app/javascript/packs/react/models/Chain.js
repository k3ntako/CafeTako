import FetchHelper from './FetchHelper';

export default class Chain{
  constructor( props ){
    const { id, name } = props;

    this._id = id;
    this._name = name;
  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }

  static async create( props ){
    const name = props.name.trim();
    const chain = Number(props.chain);

    if( !name ){
      console.error("Invalid name.");
      return null;
    }

    return FetchHelper.post('/api/v1/chains', {
      name, chain
    }).then(response => {
      return new Chain( response );
    });
  }

  static getAll( limit = 24 ){
    return FetchHelper.get('/api/v1/chains', {
      limit
    })
    .then(responseJSON => {
      return responseJSON.map(chainJson => {
        return new Chain( chainJson );
      })
    });
  }

}
