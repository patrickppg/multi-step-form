import { useEffect, useState } from "react"
import { addons, plans } from '../utils'
import { formatPhone } from "../scripts/formatting-data"
import { getEmailError, getNameError, getPhoneError } from "../scripts/validating-data"

function Steps({ currentStep, isDataSubmitted, getSummary, onSummaryChange }) {
  const [billing, setBilling] = useState("monthly")

  function handleBillingChange() {
    if (billing === "monthly") setBilling("yearly")
    else setBilling("monthly")
  }

  return (
    <div className="steps-contents">
      <StepInfo currentStep={currentStep} />
      <StepPlan currentStep={currentStep} billing={billing} onBillingChange={handleBillingChange} />
      <StepAddons currentStep={currentStep} billing={billing} />
      <StepSummary currentStep={currentStep} isDataSubmitted={isDataSubmitted} billing={billing} getSummary={getSummary} onSummaryChange={onSummaryChange} />
    </div>
  )
}

function StepInfo({ currentStep }) {
  const [errors, setErrors] = useState({ name: "", email: "", phone: ""})

  function handlePhoneChange(e) {
    e.target.value = formatPhone(e.target.value)
  }

  function handleInvalid(control, getError) {
    setErrors(e => ({
      ...e,
      [control.name]: getError(control),
    }))

    control.addEventListener("change", () => {
      let error

      if (control.validity.valid) error = ""
      else error = getError(control)

      setErrors(e => ({
        ...e,
        [control.name]: error,
      }))
    })
  }

  return (
    <fieldset name="step-01" className="step info"  hidden={currentStep !== 1}>
      <legend className="heading">Personal info</legend>
      <p className="description">Please provide your name, email address, and phone number.</p>
      <div className="field">
        <div className="details">
          <label htmlFor="input-name" className="label" >Name</label>
          <span className="error" hidden={!errors.name && true}>{errors.name}</span>
        </div>
        <input name="name" type="text" id="input-name" className={`control${errors.name ? " invalid" : ""}`} placeholder="e.g. Stephen King" autoComplete="name" spellCheck="false" required onInvalid={(e) => handleInvalid(e.target, getNameError)} />
      </div>
      <div className="field">
        <div className="details">
          <label htmlFor="input-email" className="label">Email Address</label>
          <span className="error" hidden={!errors.email && true}>{errors.email}</span>
        </div>
        <input name="email" type="email" id="input-email" className={`control${errors.email ? " invalid" : ""}`} placeholder="e.g. stephenking@lorem.com" autoComplete="email" spellCheck="false" required onInvalid={(e) => handleInvalid(e.target, getEmailError)} />
      </div>
      <div className="field">
        <div className="details">
          <label htmlFor="input-phone" className="label" >Phone Number</label>
          <span className="error" hidden={!errors.phone && true}>{errors.phone}</span>
        </div>
        <input name="phone" type="tel" id="input-phone" className={`control${errors.phone ? " invalid" : ""}`} placeholder="e.g. (123) 456-7890" autoComplete="tel-national" pattern="^\(\d{3}\) \d{3}-\d{4}$" required onChange={handlePhoneChange} onInvalid={(e) => handleInvalid(e.target, getPhoneError)} />
      </div>
    </fieldset>
  )
}

function StepPlan({ currentStep, billing, onBillingChange }) {
  function handleBillingClick() {
    onBillingChange()
  }

  return (
    <fieldset className="step plan" name="step-02" hidden={currentStep !== 2}>
      <legend className="heading">Select your plan</legend>
      <p className="description">You have the option of monthly or yearly billing.</p>
      <fieldset className="plans">
          {plans.map(plan => (
          <label className="plan" key={plan.code}>
            <img className="icon" src={plan.icon} alt="" />
            <span className="info">
              <strong className="name">{plan.name}</strong>
              <small className="price">{`$${billing === "monthly" ? plan.price.month : plan.price.year}/${billing === "monthly" ? "mo" : "yr"}`}</small>
              <small className="details" hidden={billing === "monthly" ? true : false}>{plan.details}</small>
            </span>
            <input className="control" name="plan" value={plan.code} type="radio" defaultChecked={plan.code === "arcade" ? true : null} />
          </label>))}
      </fieldset>
      <div className="billing">
        <button className="switch" type="button" onClick={handleBillingClick}>
          <span className={`option monthly${billing === "monthly" ? " selected" : ""}`}>Monthly</span>
          <span className={`thumb${billing === "monthly" ? " left" : " right"}`}></span>
          <span className={`option yearly${billing === "yearly" ? " selected" : ""}`}>Yearly</span>
        </button>
        <input type="hidden" name="billing" value={billing} />
      </div>
    </fieldset>
  )
}

function StepAddons({ currentStep, billing }) {
  return (
    <fieldset className="step addons" name="step-03" hidden={currentStep !== 3}>
      <legend className="heading">Pick add-ons</legend>
      <p className="description">Add-ons help enhance your gaming experience.</p>
      {addons.map(addon => (
      <label className="addon" key={addon.code}>
        <span className="checkbox">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9">
            <path fill="none" stroke="white" strokeWidth="2" d="m1 4 3.433 3.433L10.866 1"/>
          </svg>
        </span>
        <span className="info">
          <strong className="name">{addon.name}</strong>
          <small className="details">{addon.details}</small>
        </span>
        <small className="price">{`+$${billing === "monthly" ? addon.price.month : addon.price.year}/${billing === "monthly" ? "mo" : "yr"}`}</small>
        <input className="control" name="addon" value={addon.code} type="checkbox" />
      </label>))}
    </fieldset>
  )
}

function StepSummary({ currentStep, isDataSubmitted, billing, getSummary, onSummaryChange }) {
  const [summary, setSummary] = useState({ billing: "", plan: { name: "", price: null, }, addons: []})

  let total = summary.plan.price
  summary.addons.forEach(addon => total += addon.price)

  useEffect(() => {
    if (currentStep === 4) setSummary(getSummary())
  }, [currentStep, getSummary])

  return (
    <div className="step summary" hidden={currentStep !== 4}>
      <div hidden = {isDataSubmitted ? true : false}>
        <strong className="heading">Finishing up</strong>
        <p className="description">Double-check everything looks OK before confirming.</p>
        <div className="data container">
          <div className="choice plan">
            <span className="plan">
              <span>{`${summary.plan.name} (${summary.billing === "Month" ? "Monthly" : "Yearly"})`}</span>
              <button type="button" className="button change" onClick={onSummaryChange}>Change</button>
            </span>
            <span className="price">{`$${summary.plan.price}/${billing === "monthly" ? "mo" : "yr"}`}</span>
          </div>
          {summary.addons.map(addon => (
          <div className="choice addon" key={addon.name}>
            <span>{addon.name}</span>
            <span className="price">{`+$${addon.price}/${billing === "monthly" ? "mo" : "yr"}`}</span>
          </div>
          ))}
        </div>
        <div className="total container">
          <span>{`Total (per ${summary.billing})`}</span>
          <span className="price total">{`$${total}/${billing === "monthly" ? "mo" : "yr"}`}</span>
        </div>
      </div>
      <div className="alert success" hidden={isDataSubmitted ? false : true}>
        <img className="icon" src="./src/assets/images/icon-thank-you.svg" alt="" />
        <br />
        <strong className="thanks">Thank you!</strong>
        <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
      </div>
    </div>
  )
}


export default Steps