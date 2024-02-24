=> created server using express js

=> Created a post request with app to get and translate data

=> Used Axios for fetch call with options
    const options = {
      method: "POST",
      url: TRANSLATE_API,
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
      data: JSON.stringify({
        text: text,
        source: "en",
        target: "fr",
      }),
    };
    
=> checking if the text is empty or not if it is empty send an error message to the user

=> If there is no error then fetch the result and send it to the user

=> sending response in JSON format

=> If there is any error while fetching the data then showed a Something went wrong message.
