export default (props) => {
  return (
    <ul>
      {
        _.map(props.groups, (group) => <li>{group.name}</li>)
      }
    </ul>
  )
}