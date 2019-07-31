import FetchHelper from './FetchHelper';

export default class Location{
  constructor( locationId, props ){
    const { id, title, score, music, review, seatingCount, bathroomCount, noiseLevel, wifiSpeed } = props;

    this._locationId = locationId;

    this._id = id;
    this._title = title;
    this._score = score;
    this._music = music;
    this._review = review;
    this._seatingCount = seatingCount;
    this._bathroomCount = bathroomCount;
    this._noiseLevel = noiseLevel;
    this._wifiSpeed = wifiSpeed;
  }

  get id(){
    return this._id;
  }

  static create( chainId, locationId, props ){
    const rubyProps = FetchHelper.convertToRubySyntax( props );
    rubyProps.score = Number(rubyProps.score);
    rubyProps.music = rubyProps.music === "yes" ? true : rubyProps.music === "no" ? false : null;

    if( !rubyProps.title || !rubyProps.score || isNaN(rubyProps.score) ){
      console.error("Title and score are required.");
      return;
    }

    return FetchHelper.post(`/api/v1/chains/${chainId}/locations/${locationId}/reviews`, rubyProps).then(response => {
        return `/chains/${chainId}/locations/${locationId}/`;
      });
  }
}
