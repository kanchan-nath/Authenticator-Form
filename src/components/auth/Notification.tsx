import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle2 } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const notification = notificationRef.current;
    if (!notification) return;

    // Animate in
    gsap.fromTo(
      notification,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }
    );

    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      gsap.to(notification, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: onClose,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      ref={notificationRef}
      className="fixed top-4 right-4 flex items-center gap-2 bg-success-500 text-white px-4 py-3 rounded-lg shadow-lg z-50"
    >
      <CheckCircle2 className="h-5 w-5" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Notification;