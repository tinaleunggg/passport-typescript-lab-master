declare global {
  namespace Express {
    export interface User {
      id: number,
      name: string,
      email: string,
      password: string,
      role: string
    }
  }
}


let database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
  {
    id: 4,
    name: "admin",
    email: "admin@gmail.com",
    password: "1234",
    role: "admin"
  }
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },

  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findOrCreate: (profile: {name: string, userId: number}, callback: (err?: Error | null, profile?: any) => void) => {
    try {
      let user: Express.User | undefined;
        user = database.find((user) => user.id === profile.userId);
        if (!user) {
          user = {
          id: profile.userId,
          name: profile.name,
          email: "",
          password: "",
          role: "user"
          };
          database.push(user);
        }
      callback(null, user)
    } catch (err:any) {
      callback(err, null)
    }
  }
};

export { database, userModel };
