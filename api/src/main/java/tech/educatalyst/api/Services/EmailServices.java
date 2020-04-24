package tech.educatalyst.api.Services;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;


import java.io.IOException;


public class EmailServices {
    Email from;
    Email to;
    String subject;
    Content content;
    Mail mail;
    SendGrid sg = new SendGrid("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");

    public EmailServices(String from, String to, String subject, String content) {
        this.from = new Email();
        this.from.setEmail(from);
        this.to = new Email();
        this.to.setEmail(to);
        this.subject = subject;
        this.content = new Content("text/plain",content);
        mail = new Mail(this.from,this.subject,this.to, this.content);
    }
    public Response sendMail() throws IOException {
       try {
           Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        return response;
       }catch (IOException ex) {
           throw ex;
       }
    }
}
