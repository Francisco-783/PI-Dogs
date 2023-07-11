import styles from './DetailsCard.module.css';

const DetailsCard = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.image} alt={props.name} />
      <h1>{props.name}</h1>
      <p>Temperaments: {props.Temperaments}</p>
      <p>Life Span: {props.life_span}</p>
      <p>Height: {props.height}</p>
      <p>Weight: {props.weight}</p>
    </div>
  );
}

export default DetailsCard;
