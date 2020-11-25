export default function TeamList(props) {
  let res = [];

  if (props.data != null) {
    let dataValues = Object.values(props.data);
    let dataKeys = Object.keys(props.data);
    for (let i = 0; i < dataValues.length; i++) {
      if (dataValues[i].category === props.label) {
        res.push(<li key={dataKeys[i]}>{dataKeys[i]}</li>)
      }
    }
  }
  
  if (props.data != null) {
    return (
      <ul>
        <li className="teamHeader">{props.header}</li>
        {res}
      </ul>
      )
  } else {
    return (null)
  }
}