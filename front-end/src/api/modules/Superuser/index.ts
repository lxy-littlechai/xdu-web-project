import { baseInstance } from "@/api/instance";


const getSystemLog = (data: any) => {
  return baseInstance({
    url: "/Superuser/Log",
    method: 'post',
    data
  });
}

const getAllborrowedBook = (data: any) => {
  return baseInstance({
    url: "/Superuser/GetAllborrowedBook",
    method: 'post',
    data
  });
}

const getAllUser = (data: any) => {
  return baseInstance({
    url: "/Superuser/GetAllUser",
    method: 'post',
    data
  });
}

const backUpDB = () => {
  return baseInstance({
    url: "/Superuser/BackUpDB",
    method: 'post',

  });
}

const restoreDB = () => {
  return baseInstance({
    url: "/Superuser/RestoreDB",
    method: 'post',

  });
}


export { getSystemLog, getAllborrowedBook, getAllUser, backUpDB, restoreDB };