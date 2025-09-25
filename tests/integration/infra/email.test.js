import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "Alan <alan@dev.com.br>",
      to: "alan.test@dev.com.br",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Alan <alan@dev.com.br>",
      to: "alan.test@dev.com.br",
      subject: "Teste de assunto 2",
      text: "Teste de corpo 2.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<alan@dev.com.br>");
    expect(lastEmail.recipients[0]).toBe("<alan.test@dev.com.br>");
    expect(lastEmail.subject).toBe("Teste de assunto 2");
    expect(lastEmail.text).toBe("Teste de corpo 2.\n");
  });
});
