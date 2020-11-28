import ListItem from './ListItem';

export default function TeamList(props) {
  let res = [];

  if (props.data != null) {
    let dataValues = Object.values(props.data);
    let dataKeys = Object.keys(props.data);

    // Iterates through data
    for (let i = 0; i < dataValues.length; i++) {
      // Append to res if the datum satisfies the constraint
      if (dataValues[i].category === props.label) {
        if (props.toggle) {
          // If this is in the waiting room, allow toggle
          res.push(<ListItem key={dataKeys[i]} name={dataKeys[i]} gameid={props.gameid} team={dataValues[i].category} />);
        } else {
          // Otherwise, push normal list items
          res.push(<li key={dataKeys[i]}>{dataKeys[i]}</li>);
        }
      }
    }
  }
  

  // Only renders if data exists (hides for initial review page)
  if (props.data != null) {
    return (
      <ul>
        <li className="teamHeader">{props.header}</li>
        {res}
      </ul>
    );
  } else {
    return (null);
  }
}