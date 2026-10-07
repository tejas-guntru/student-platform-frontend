interface AssessmentMessagesProps {
  error: string;
  message: string;
}

export default function AssessmentMessages({
  error,
  message,
}: AssessmentMessagesProps) {
  if (!error && !message) {
    return null;
  }

  return (
    <div
      className="
        mt-5
        min-w-0
        space-y-3

        sm:mt-6
      "
    >
      {error && (
        <div
          className="
            min-w-0
            rounded-lg
            border
            border-red-200
            bg-red-50
            p-3.5
            text-sm
            leading-6
            text-red-700

            sm:p-4
          "
          role="alert"
          aria-live="assertive"
        >
          <p className="break-words">
            {error}
          </p>
        </div>
      )}

      {message && (
        <div
          className="
            min-w-0
            rounded-lg
            border
            border-green-200
            bg-green-50
            p-3.5
            text-sm
            leading-6
            text-green-700

            sm:p-4
          "
          role="status"
          aria-live="polite"
        >
          <p className="break-words">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}