DELIMITER $$

CREATE PROCEDURE GetVolunteerHistory(IN VolunteerID INT)
BEGIN
    SELECT 
        h.History_ID,
        h.Feedback,
        v.first_name AS Volunteer_FirstName,
        v.last_name AS Volunteer_LastName,
        d.name AS Disaster_Name,
        d.location AS Disaster_Location,
        d.disasterType AS Disaster_Type,
        d.severity AS Disaster_Severity
    FROM 
        histories h
    JOIN 
        Volunteers v ON h.Volunteer_ID = v.Volunteer_ID
    JOIN 
        Disasters d ON h.Disaster_ID = d.Disaster_ID
    WHERE 
        h.Volunteer_ID = VolunteerID;
END$$

DELIMITER ;
