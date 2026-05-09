import { isBlockedIPAddress } from "./safeFetch";

describe("safeFetch IP filtering", () => {
  it("allows benchmarking addresses used by some outbound gateways", () => {
    expect(isBlockedIPAddress("198.18.0.20")).toBe(false);
    expect(isBlockedIPAddress("198.19.255.255")).toBe(false);
  });

  it("blocks loopback, private, and link-local addresses", () => {
    expect(isBlockedIPAddress("127.0.0.1")).toBe(true);
    expect(isBlockedIPAddress("10.0.0.1")).toBe(true);
    expect(isBlockedIPAddress("172.16.0.1")).toBe(true);
    expect(isBlockedIPAddress("192.168.1.1")).toBe(true);
    expect(isBlockedIPAddress("169.254.1.1")).toBe(true);
  });

  it("allows normal public addresses", () => {
    expect(isBlockedIPAddress("8.8.8.8")).toBe(false);
    expect(isBlockedIPAddress("1.1.1.1")).toBe(false);
  });
});
