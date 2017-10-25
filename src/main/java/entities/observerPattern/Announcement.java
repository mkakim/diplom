package entities.observerPattern;
import managers.NotificationManager;

import java.sql.Timestamp;

/**
 * Created by Каким Мерей on 01.04.2017.
 */
public class Announcement implements Observed {

    private int id;
    private String description;
    private Timestamp announTime;

    private NotificationManager notificationManager = new NotificationManager();

    /**
     * Админ добавляет объяление и уведомляет всех плательшиков
     * @param announcement
     */
    @Override
    public void addAnnouncement(Announcement announcement) {
        notificationManager.add(announcement);
        notifyObservers();
    }

    /**
     * Админ удаляет объяление и уведомляет всех плательшиков
     */
    @Override
    public void removeAnnouncement() {
        //notificationManager.remove();
        notifyObservers();
    }

    @Override
    public void notifyObservers() {
        notificationManager.notifyAllObservers();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getAnnounTime() {
        return announTime;
    }

    public void setAnnounTime(Timestamp announTime) {
        this.announTime = announTime;
    }
}
