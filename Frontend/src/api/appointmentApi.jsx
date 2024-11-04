
import axios from 'axios';

export const getUpcomingAppointments = async (adminId) => {
  try {
    // Pass adminId as a query parameter
    const response = await axios.get('http://localhost:9500/v1/dashboard-adminFlow/appointement-upcomming', {
      params: { adminId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    throw error;
  }
};


export const getTodayAppointments = async (adminId) => {
  try {
    const response = await axios.get('http://localhost:9500/v1/dashboard-adminFlow/appointement-today', {
      params: { adminId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s appointments:', error);
    throw error;
  }
};

export const getPreviousAppointments = async (adminId) => {
  try {
    const response = await axios.get('http://localhost:9500/v1/dashboard-adminFlow/appointement-previous', {
      params: { adminId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching previous appointments:', error);
    throw error;
  }
};

export const getCanceledAppointments = async (adminId) => {
  try {
    const response = await axios.get('http://localhost:9500/v1/dashboard-adminFlow/appointement-cancel', {
      params: { adminId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching canceled appointments:', error);
    throw error;
  }
};