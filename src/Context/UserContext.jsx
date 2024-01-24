import React, { createContext, useState } from "react";
import axios from "axios";


// Axios instance creation
const baseURL = "http://localhost:3000/api/v1/users";
// const baseURL = "https://safetyapp-wnjz.onrender.com/api/v1/users";
const axiosInstance = axios.create({ baseURL });

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);


  // Register User
  const registerUser = async (userSignInData) => {
    try {
      const response = await axiosInstance.post("/", userSignInData);
      console.log("User registered successfully");

      // Automatically log in the user after registration
      const isLoginSuccessful = await loginTheUser(
        userSignInData.email,
        userSignInData.password
      );
      if (isLoginSuccessful) {
        console.log("User logged in successfully");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      setError(errorMessage);
      return false;
    }
  };

  // Log in the User
  const loginTheUser = async (email, password) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      if (response.data.token) {
  
        setUserData(response.data.user)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loggedInUserName", response.data.name);
        localStorage.setItem("isLoggedIn", true);

        await authTheUser(response.data.token);

        if (authTheUser) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("loggedInUserId", response.data._id);
          localStorage.setItem("loggedInUserName", response.data.name);
          localStorage.setItem("isLoggedIn", true);
          return true;
        }
      }
    } catch (error) {
      console.error(
        "Login problem:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data : error.message);
    }
  };

  // Authenticate the User
  const authTheUser = async (token) => {
    try {
      const response = await axiosInstance.get("/s/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error(
        "Authentication problem:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data : error.message);
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("loggedInUserName");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUserId");
   
  };
// ...............................................................................................

const getUserData = async () => {
  const id = localStorage.getItem('loggedInUserId')
  console.log("fetching user data")
  try {
    const response = await axiosInstance.get(`/${id}`);
    setUserData(response.data);
    return true; // Indicates successful data fetch
  } catch (error) {
    console.log(error);
    return false; // Indicates an error occurred
  }
};


const updateUserData = async (newUserData) => {
  console.log(newUserData)
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const response = await axiosInstance.put(`/`, newUserData, { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Handle successful response
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Unexpected response status:', response.status);
      return null;
    }
  } catch (error) {
    // Informative error handling
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Config of the request:', error.config);
    throw error;
  }
}

const sendScreenshotToBackend = async (file) => {
  console.log(file);
  console.log("Sending screenshot to backend");
  const formData = new FormData();
  formData.append('image', file); // 'image' should match the field name expected by multer

  // Get the logged-in user's ID from local storage
  const userId = localStorage.getItem('loggedInUserId');
  if (!userId) {
    console.error("User ID not found. User might not be logged in.");
    return;
  }

  // Append the user ID to the form data
  formData.append('userId', userId);

  try {
      const response = await axiosInstance.post('/image', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      console.log("Response:", response.data);
  } catch (error) {
      console.error("Error sending screenshot:", error);
  }
};

// ..........................................ai....................................................
const sendPromptToOpenAi = async (prompt) => {
  console.log(prompt)
  
  try {
    const response = await axiosInstance.post('/ai',{ prompt });

    if (response.status === 200) {
      console.log("OpenAI response:", response.data);
      return response.data; // Contains the OpenAI's response
    } else {
      console.error('Unexpected response status:', response.status);
      return null;
    }
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    throw error;
  }
};

// ..........................................ai....................................................

// ................................................................................................
  // Provide registerUser, loginTheUser, authTheUser, and error through the context
  return (
    <UserContext.Provider
      value={{ registerUser, loginTheUser, authTheUser, logoutUser,updateUserData, getUserData, setUserData, sendScreenshotToBackend, sendPromptToOpenAi, userData, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
