const seatingCount = [
  { value: "not_selected", text: "" },
  { value: "none", text: "None" },
  { value: "very_small", text: "1 to 10" },
  { value: "small", text: "11 to 20" },
  { value: "medium", text: "21 to 30" },
  { value: "large", text: "31+" },
];

const bathroomCount = [
  { value: "not_selected", text: "" },
  { value: "none", text: "None" },
  { value: "one", text: "1" },
  { value: "two", text: "2" },
  { value: "three", text: "3" },
  { value: "four", text: "4" },
  { value: "five_plus", text: "5+" },
];

const music = [
  { value: "not_selected", text: "" },
  { value: "yes", text: "Yes" },
  { value: "no", text: "No" },
];

const noiseLevel = [
  { value: "not_selected", text: "" },
  { value: "silent", text: "Silent" },
  { value: "quiet", text: "Quiet" },
  { value: "medium", text: "Medium" },
  { value: "loud", text: "Loud" },
  { value: "very_loud", text: "Very Loud" },
];

const wifiSpeed = [
  { value: "not_selected", text: "" },
  { value: "none", text: "None" },
  { value: "slow", text: "Slow" },
  { value: "average", text: "Average" },
  { value: "fast", text: "Fast" },
];

const options = {
  seatingCount, bathroomCount, music, noiseLevel, wifiSpeed,
}

const getOptionFromValue = ( type, value ) => {
  for (let option of options[type]){
    if( option.value === value ){
      return option;
    }
  }

  return {};
}

module.exports = Object.assign(options, { getOptionFromValue });
