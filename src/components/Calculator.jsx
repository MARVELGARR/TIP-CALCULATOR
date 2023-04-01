import React, {useState, useEffect} from 'react';
import '../styles.css';
import Header from './Header';
import Leftside from './Left_side';
import Rightside from './Right_side';

const Calculator = () => {

  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState(1);
  const [custom, setCustom] = useState("custom");
  const [percentage, setPercentage] = useState(5);
  const [tip, setTip] = useState(0);
  const [tipAmountPerPersons, setTipAmountPerPersons] = useState(0);
  const [totalAmountPerPersons, setTotalAmountPerPersons] = useState(0);
  const [isActive, setIsActive] = useState(0);
  useEffect(()=>{
    calTip();
  }, [bill, percentage, people, tip, custom]);

  const collectPeople =(event) =>{
    const noPeople = event.target.value;
    setPeople(noPeople);
  };
  const collectCustoms =(event) =>{
    const noCustoms = event.target.value;
    setCustom(noCustoms);
  };

  
  const handleReset =() =>{
    setToZero()
  }
  const setToZero = () =>{
    setBill(0);
    setPeople(1);
    setCustom("custom");
    setIsActive(0)
  }
  const calcTipAmount = (bill, percentage, custom) =>{
    if (custom > 0){
      const tipAmount = parseFloat(bill * (custom/100).toFixed(2));
      setTip(tipAmount);
    }
    else{
      const tipAmount = parseFloat(bill * (percentage/100).toFixed(2));
      setTip(tipAmount);
    }
    
  } 

  const calcTipAmountPerPerson =(tip, people) => {
    if (people < 1){
      setTipAmountPerPersons(0);  
    }
    else{
      const tipAmountPerPerson = parseFloat((tip / people));
      setTipAmountPerPersons(tipAmountPerPerson);
    }
    
  }
  const calcTotalTipPerPerson = (bill, tip, people) =>{
    const totalAmountIncludingTip = bill + tip;
    if (people < 1){
      setTotalAmountPerPersons(0);
    }
    else{
      const totalAmountPerPerson = parseFloat(totalAmountIncludingTip / people);
      setTotalAmountPerPersons(totalAmountPerPerson);
    }
    
    
  }
  const calTip = () =>{
    calcTipAmount(bill, percentage, custom);
    calcTipAmountPerPerson(tip, people);
    calcTotalTipPerPerson(bill, tip, people);

  }
  
  return (
    <>
      <div className="w-auto font-monoSpace">
        <div className="app-calculator flex flex-col">
          <Header />
          <div className="md:flex md:gap-7 md:flex-row md:bg-white md:shadow-2xl md:rounded-2xl">
            <Leftside
              bill={bill}
              setBill={setBill}
              people={people}
              setPeople={setPeople}
              custom={custom}
              setCustom={setCustom}
              collectCustoms={collectCustoms}
              percentage={percentage}
              setPercentage={setPercentage}
              tip={tip}
              tipAmountPerPersons={tipAmountPerPersons}
              totalAmountPerPersons={totalAmountPerPersons}
              calTip={calTip}
              handleReset={handleReset}
              setToZero={setToZero}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            <Rightside 
              bill={bill}
              setBill={setBill}
              people={people}
              setPeople={setPeople}
              custom={custom}
              setCustom={setCustom}
              percentage={percentage}
              setPercentage={setPercentage}
              tip={tip}
              tipAmountPerPersons={tipAmountPerPersons}
              setTipAmountPerPersons={setTipAmountPerPersons}
              totalAmountPerPersons={totalAmountPerPersons}
              setTotalAmountPerPersons={setTotalAmountPerPersons}
              calTip={calTip}
              handleReset={handleReset}
              setToZero={setToZero}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Calculator;
