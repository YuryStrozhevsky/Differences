import BigNumber from "./bignumber.js/bignumber.js";
//*******************************************************************************************
function pascalTriangle()
{
	let existing = [new BigNumber(0), new BigNumber(1), new BigNumber(1), new BigNumber(0)];
	let length = 4;

	const C = [existing];

	for(let n = 1; n <= 100; n++)
	{
		const array = [];

		array[0] = new BigNumber(0);
		array[length] = new BigNumber(0);

		for(let k = 1; k < length; k++)
			array[k] = existing[k - 1].plus(existing[k]);

		C.push(array);

		existing = array;
		length += 1;
	}

	return C;
}
//*******************************************************************************************
function degreeProduction(x, degree)
{
	if(degree === 0)
		return new BigNumber(1);

	let result = [x];

	for(let j = 0; j < (degree - 1); j++)
		result.push(result[j].times(x));

	return result[result.length - 1];
}
//*******************************************************************************************
function polinomCalculation(coefs, x)
{
	const length = coefs.length;
	let result = new BigNumber(0);

	for(let j = (length - 1); j >= 0; j--)
		result = result.plus(degreeProduction(x, (length - 1) - j).times(coefs[j]));

	return result;
}
//*******************************************************************************************
function getRandomArbitrary(min = 0)
{
	const max = (min + 10);

	return Math.random() * (max - min) + min;
}
//*******************************************************************************************
function calculate(random = false)
{
	//region Get all necessary values from user
	const degree = parseInt(document.getElementById("i_degree").value, 10);
	const step = new BigNumber(parseFloat(document.getElementById("i_step").value));

	// We need to have enough number for calculation (first "degree + 1" number will be from "real" values, not calculated)
	const count = parseInt(document.getElementById("i_count").value, 10) + degree + 1;

	const start = parseFloat(document.getElementById("i_start").value);
	//endregion

	//region Initial variables
	const C = pascalTriangle();
	const _C = C[degree];
	//endregion

	//region Representing calculation formula to user
	let formula = "";
	let sign = "";

	for(let i = 2; i < (_C.length - 1); i++)
	{
		formula += `${sign}${_C[i]}*y(x-${i - 1}*step)`;

		if((sign === "") || (sign === "+"))
			sign = "-";
		else
			sign = "+";
	}

	document.getElementById("t_formuladif").value = formula;
	//endregion

	//region Calculate coefficients for polinom
	// For simplicity I made this algorithm for coefficients. Advanced user could modify the code and set any values - these are not important for the algorithm
	const coefs = [];

	for(let i = 0; i < (degree + 1); i++)
		coefs.push(new BigNumber(i + 1));
	//endregion

	//region Representing real polinom formula to user
	let realFormula = "";
	sign = "";

	for(let i = 0; i < coefs.length; i++)
	{
		realFormula += `${sign}${coefs[i]}*x^${degree - i}`;
		sign = "+";
	}

	document.getElementById("t_formulareal").value = realFormula;
	//endregion

	//region Calculate and represent real values for polinom
	const real = [];
	let x = new BigNumber(start);

	if(random === false)
	{
		for(let i = 0; i < count; i++, x = x.plus(step))
			real.push(polinomCalculation(coefs, x));
	}
	else
	{
		// In this case we generate only first numbers - remaining would be calculated
		for(let i = 0; i < (degree + 1); i++)
			real.push(new BigNumber(getRandomArbitrary(start)));
	}

	document.getElementById("t_real").value = real.join(", ");
	//endregion

	//region Calculate values via formula
	const calc = [];

	for(let i = 0; i < (degree + 1); i++)
		calc[i] = real[i];

	for(let i = (degree + 1); i < count; i++)
	{
		let value = new BigNumber(0);
		let multiplier = new BigNumber(1);

		for(let j = 2; j < (_C.length - 1); j++)
		{
			value = value.plus(calc[i - j + 1].times(_C[j]).times(multiplier));
			multiplier = multiplier.times(-1);
		}

		calc.push(value);
	}

	document.getElementById("t_calc").value = calc.join(", ");
	//endregion

	//region Compare real and calculated via formula values
	// We could correctly compare only in case we have non-random values
	if(random === false)
	{
		let equal = true;

		for(let i = 0; i < count; i++)
		{
			if(real[i].eq(calc[i]) === false)
			{
				equal = false;
				break;
			}
		}

		if(equal)
			alert("Real and calculated values are all equal!");
		else
			alert("Some of real and calculated values are NOT all equal!");
	}
	//endregion
}
//*******************************************************************************************
window.calculate = calculate;
