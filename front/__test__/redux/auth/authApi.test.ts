import { AuthApi } from "../../../src/features/auth/authApi";
import { RoleType } from "../../../src/features/user/userReducer";
import { ResultCodeEnum } from "../../../src/store/configureApi";

// 👇 Мокаем методы AuthApi
jest.mock("../../../src/features/auth/authApi", () => ({
  AuthApi: {
    login: jest.fn(),
    reg: jest.fn(),
  }
}));

describe("AuthApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("login user", async () => {
    const mockUser = {
      data: {
        token: "mocked_token",
      },
      errors: [],
      resultcode: ResultCodeEnum.Success,
    };

    (AuthApi.login as jest.Mock).mockResolvedValueOnce(mockUser);

    const user = await AuthApi.login("AlexBram003@gmail.com", "12344321");

    expect(user).toEqual(mockUser);
  });

  it("reg user", async () => {
    const mockUser = {
      data: {
        token: "mocked_token",
      },
      errors: [],
      resultcode: ResultCodeEnum.Success,
    };

    (AuthApi.reg as jest.Mock).mockResolvedValueOnce(mockUser);

    const user = await AuthApi.reg(
      "AlexBram003",
      "12344321",
      "AlexBram003@gmail.com",
      "123456789",
      RoleType.client
    );

    expect(user).toEqual(mockUser);
  });
});
