import axios from "axios";
import { useState } from "react";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments } from '../../redux/actions';
import style from "./Form.module.css";
    var temperaments= []
const Form = () => {
    const temperamentsRedux =  useSelector(state => state && state.temperaments)


    const [form, setform] = useState({
        name:"",
        image:"",
        life_spanMin:0,
            life_spanMax:0,
        heightMin:0,
            heightMax:0,
        weightMin:0,
            weightMax:0,
        temperaments:[],
    })
    const [errors, setErrors] = useState({
        submit:"",
        name:"",
        image:"",
        life_span:"",
        height:"",
        weight:"",
        temperaments:"",
        modified:"NO"
    })

    const checkboxChangeHandler = (e) => {
        const temperamentErrors = { ...errors };
        if (e.target.checked === true){
            temperaments.push(e.target.value)
        }
        if (e.target.checked === false){
            temperaments = temperaments.filter((item) => item !== e.target.value)
        }
        
        // Validaciones de TEMPERAMENTS
        
        if (temperaments.length ===0){
            temperamentErrors.temperaments = "add at least one temperament";
        }
        if (temperaments.length >0){
            temperamentErrors.temperaments = "";
        }
        setErrors(temperamentErrors);
    }
    const validate = (form) => {
        // Crear una copia del objeto `errors`
        const newErrors = { ...errors };
        newErrors.modified = "";
        // Validaciones de NAME
        if (!form.name) {
            newErrors.name = "obligatory field";
        }
        else if (form.name.length < 4) {
            newErrors.name = "very short name";
        } 
        else {
            newErrors.name = "";
        }
        // Validaciones de IMAGE
        if (form.image === "") {
            newErrors.image = "obligatory field";} 
        else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(form.image)) {
            newErrors.image = "invalid URL";
        } 
        else if (form.image.length > 199) {
            newErrors.image = "very long URL";
        } 
        else {
        newErrors.image = "";
        }
        // Validaciones de LIFE_SPAN
        if (form.life_spanMin > form.life_spanMax){
            newErrors.life_span = "the minimum cannot be greater than the maximum"  ;
        }
        else if (form.life_spanMin === form.life_spanMax){
            newErrors.life_span = "The minimum and maximum cannot be the same";
        }
        else if (form.life_spanMax>20){
            newErrors.life_span = "20 years maximum";
        }
        else if (form.life_spanMin<1||form.life_spanMax<1){
            newErrors.life_span = "obligatory field";
        }
        else {
            newErrors.life_span = "";
        }
        // Validaciones de HEIGHT
        if (form.heightMin > form.heightMax){
            newErrors.height = "the minimum cannot be greater than the maximum";
        }
        else if (form.heightMin === form.heightMax){
            newErrors.height = "The minimum and maximum cannot be the same";
        }
        else if (form.heightMax>110){
            newErrors.height = "110 centimeters maximum";
        }
        else if (form.heightMin<1||form.heightMax<1){
            newErrors.height = "obligatory field";
        }
        else {
            newErrors.height = "";
        }
        // Validaciones de WEIGHT
        if (form.weightMin > form.weightMax){
            newErrors.weight = "the minimum cannot be greater than the maximum";
        }
        else if (form.weightMin === form.weightMax){
            newErrors.weight = "The minimum and maximum cannot be the same";
        }
        else if (form.weightMax>110){
            newErrors.weight = "110 kilos maximum";
        }
        else if (form.weightMin<1||form.weightMax<1){
            newErrors.weight = "obligatory field";
        }
        else {
            newErrors.weight = "";
        }

        // Actualizar el estado de `errors` una vez al final
        setErrors(newErrors);
        };

    const changeHandler = (event) => {
        const propiedad = event.target.name;
        const input = event.target.value
        validate({...form, [propiedad]:input})
        setform({...form, [propiedad]:input})
    }
    const Dispatch = useDispatch();
    if (!temperamentsRedux){
        return <div>Loading...</div>
    }
    const submitHandler = (event) => {
        var height = [form.heightMin, form.heightMax];
        var life_span = [form.life_spanMin, form.life_spanMax];
        var weight = [form.weightMin, form.weightMax];
        event.preventDefault()
        var returnForm = {...form}
        returnForm.temperaments = temperaments
        returnForm.height = height;
        returnForm.weight = weight;
        returnForm.life_span = life_span;
        delete returnForm.life_spanMin;
        delete returnForm.life_spanMax;
        delete returnForm.heightMin;
        delete returnForm.heightMax;
        delete returnForm.weightMin
        delete returnForm.weightMax
        console.log(returnForm)
        
        if (returnForm.temperaments.length<1){
            var error = errors
            error.temperaments = "agregar minimo un temperamento"
            setErrors(error)
        }

        if (Object.values(errors).every((value) => !value)) {
        axios.post("http://localhost:3001/dogs", returnForm)
        .then(alert("successfully created"))
        Dispatch( getDogs())
        Dispatch( getTemperaments())
        }
        else {return alert("Not sent, all fields are required")}
    }
    return (
        <form className={style.form} onSubmit={submitHandler}>
        <div className={style.field}>
            <label className={style.label}>Name</label>
            <input className={style.input} type="text" value={form.name} onChange={changeHandler} name="name"  autocomplete="off"/>
            {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>
        <div className={style.field}>
            <label className={style.label}>Image's URL</label>
            <input className={style.input} type="text" value={form.image} onChange={changeHandler} name="image" />
            {errors.image && <span className={style.error}>{errors.image}</span>}
        </div>
        <div className={style.fieldMinMax}>
            <label className={style.labelMinMax}>Life_span</label>
            <div>MIN</div><div>MAX</div>
            <input className={style.inputMinMax} type="number" placeholder="MIN" value={form.life_spanMin} onChange={changeHandler} name="life_spanMin" /><input className={style.inputMinMax} type="number" placeholder="MAX" value={form.life_spanMax} onChange={changeHandler} name="life_spanMax" />
            {errors.life_span && <span className={style.error}>{errors.life_span}</span>}
        </div>
        <div className={style.fieldMinMax}>
            <label className={style.labelMinMax}>Height</label>
            <div>MIN</div><div>MAX</div>
            <input className={style.inputMinMax} type="number" placeholder="MIN" value={form.heightMin} onChange={changeHandler} name="heightMin" /><input className={style.inputMinMax} type="number" placeholder="MAX" value={form.heightMax} onChange={changeHandler} name="heightMax" />
            {errors.height && <span className={style.error}>{errors.height}</span>}
        </div>
        <div className={style.fieldMinMax}>
            <label className={style.labelMinMax}>Weight</label>
            <div>MIN</div><div>MAX</div>
            <input className={style.inputMinMax} type="number" placeholder="MIN" value={form.weightMin} onChange={changeHandler} name="weightMin" /><input className={style.inputMinMax} type="number" placeholder="MAX" value={form.weightMax} onChange={changeHandler} name="weightMax" />
            {errors.weight && <span className={style.error}>{errors.weight}</span>}
        </div>
        <div className={style.tempe}>Temperaments</div>
        <div className={style.container_temperament}>
            
        {temperamentsRedux.map(tempe => (
            <div key={tempe.name} className={style.temperament}>
            <label>{tempe.name}</label>
            <input type="checkbox" value={tempe.id} onChange={(e) =>checkboxChangeHandler(e)} />
            </div>
        ))}
        </div>
        {errors.temperaments && <span className={style.error}>{errors.temperaments}</span>}
        <button className={style.button} type="submit">Create</button>
        {errors.submit && <span className={style.error}>{errors.submit}</span>}
        </form>
    );
}

export default Form