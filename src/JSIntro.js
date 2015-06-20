
exports.Sum = function(num1, num2){
	return num1+num2;
}

exports.SumOfArray = function(arrayOfNums){
	var sum=0;
	for(var i=0;i<arrayOfNums.length;i++)
		sum=sum+arrayOfNums[i];
	return sum;
}

// Sum only the unique numbers in the array.
// Ex: If array is [2,3,3,2], the sum is 2+3=5

function check(arr,num)
{
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==num)
			return false;
	}
	return true;
}

exports.SumOfUniqueNumbers = function(arrayOfNums){
	//console.log(arrayOfNums.length);
	var arr = new Array();
	var x;
	var sum=0;
	for(i=0;i<arrayOfNums.length;i++)
	{
		x=arrayOfNums[i];
		if(check(arr,x))
		{
			arr.push(x);
			sum=sum+x;
		}
	}
	return sum;
}

exports.ReverseString = function(str){
	var end=str.length-1;
	var ch;
	var start=0;
	var charArray=str.split("");
	while(start<end && start!=end)
	{
		ch=charArray[end];
		charArray[end]=charArray[start];
		charArray[start]=ch;
		start++;
		end--;
	}
	str=charArray.join("");
	return str;
}


exports.ReverseArrayOfStrings = function(arrayOfStrings){	
	var end=arrayOfStrings.length-1;
	var ch=new String();
	var start=0;
	while(start<end && start!=end)
	{
		ch=arrayOfStrings[end];
		arrayOfStrings[end]=arrayOfStrings[start];
		arrayOfStrings[start]=ch;
		start++;
		end--;
	}
	return arrayOfStrings;
}