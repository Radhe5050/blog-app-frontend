import { toast } from "react-toastify";
import { getLocalRefreshToken } from "../getTokens";
import { UserInstance } from "../axiosServices/axiosInterceptors";

export const registerUser = async (user) => {
  try {
    const response = await UserInstance.post(`/register`, user);
    const registeredUser = await response?.data;
    if (registeredUser) {
      toast.success(registeredUser?.msg);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await UserInstance.post(`/login`, user);
    const loggedinUser = await response?.data;
    if (loggedinUser) {
      toast.success("Loggedin Successfully");
      return loggedinUser;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const changeRole = async (user) => {
  try {
    const response = await UserInstance.patch(`/change`, user);
    const updatedUser = await response?.data;

    if (updatedUser) {
      toast.success(`Now ${updatedUser?.data?.firstName} is ${updatedUser?.data?.role}`);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const changeStatus = async (user) => {
  try {
    const response = await UserInstance.patch(`/change`, user);
    const updatedUser = await response?.data;

    if (updatedUser) {
      toast.success(`Now ${updatedUser?.data?.firstName} is ${updatedUser?.data?.active ? "Active" : "Inactive"}`);
      return true;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const updateUserProfile = async (user) => {
  try {
    const response = await UserInstance.patch(`/update`, user);
    const updatedUser = await response?.data;

    if (updatedUser) {
      toast.success("Profile Updated Successfully");
      return updatedUser?.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const deleteUser = async (user) => {
  try {
    const response = await UserInstance.delete(`/delete/${user?._id}`);

    if (response.status === 200) {
      toast.success(`${user?.firstName} Deleted Successfully`);
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};


export const forgotPassword = async (user) => {
  try {
    const response = await UserInstance.post(`/forgot-password`, user);
    const data = await response?.data;

    if (data) {
      toast.success(data?.msg);
      return data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}

export const checkTokenExpiry = async (token) => {
  try {
    const response = await UserInstance.post(`/check-expiry/${token?.tokenId}`,);
    const data = await response?.data;

    if (data) {
      return data.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}

export const resetPassword = async (user) => {
  try {
    const response = await UserInstance.patch(`/reset-password/${user?.userId}`, user);
    const data = await response?.data;

    if (data) {
      toast.success(data?.msg);
      return true
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}

export const getRefreshToken = async () => {
  try {
    return await UserInstance.post("/refresh", {
      refreshToken: getLocalRefreshToken(),
    });
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};