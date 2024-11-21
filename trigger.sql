DELIMITER $$

CREATE TRIGGER update_volunteer_details
AFTER UPDATE ON Users
FOR EACH ROW
BEGIN
  -- Update the Volunteer table when user details are updated
  UPDATE Volunteers
  SET
    first_name = NEW.First_name,
    last_name = NEW.Last_name,
    email = NEW.Email,
    phone_number = NEW.Phone_number
  WHERE user_id = NEW.User_ID;
END$$

DELIMITER ;
