import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import jakarta.annotation.PostConstruct;

@Service
public class SmsService {

    private final String ACCOUNT_SID = "your_twilio_account_sid";
    private final String AUTH_TOKEN = "your_twilio_auth_token";
    private final String FROM_NUMBER = "NumberTsaUser";
    private final String TO_NUMBER = "law_enforcement_number";

    @PostConstruct
    public void init() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendAlert(String messageText) {
        Message.creator(
            new PhoneNumber(TO_NUMBER),
            new PhoneNumber(FROM_NUMBER),
            messageText
        ).create();
    }
}
