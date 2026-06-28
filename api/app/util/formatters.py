from datetime import datetime, time, timedelta


WORK_START = time(10, 00)
WORK_END = time(18, 30)

WORKING_MINUTES_PER_DAY = 510


def calculate_working_minutes(
    start_datetime,
    end_datetime
):

    if not start_datetime or not end_datetime:
        return 0


    if end_datetime <= start_datetime:
        return 0


    total_minutes = 0


    current_day = start_datetime.date()


    while current_day <= end_datetime.date():


        day_start = datetime.combine(
            current_day,
            WORK_START
        )


        day_end = datetime.combine(
            current_day,
            WORK_END
        )


        actual_start = max(
            start_datetime,
            day_start
        )


        actual_end = min(
            end_datetime,
            day_end
        )


        if actual_start < actual_end:

            total_minutes += int(
                (
                    actual_end -
                    actual_start
                ).total_seconds()
                / 60
            )


        current_day += timedelta(days=1)


    return total_minutes