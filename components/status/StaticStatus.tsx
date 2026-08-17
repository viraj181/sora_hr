export const getStatusColor = (status: string) => {
  switch (status) {
    // Green
    case "inuse":
    case "Active":
    case "Completed":
    case "COMPLETED":
    case "low":
    case "LOW":
    case "low priority":
    case "Assigned":
    case "ASSIGNED":
    case "Converted":
    case "Hired":
    case "Selected":
    case "approved":
    case "completed":
    case "held":
    case "Done":
    case "APPROVED":
    case "CREATED":
    case "CREATE":
    case "ACCEPTED":
    case "SUCCESS":
      return "bg-[#a3b055]/10 text-[#a3b055] border border-[#a3b055]";

    // Red
    case "Inactive":
    case "Rejected":
    case "not_held":
    case "CANCELLED":
    case "REJECTED":
    case "reject":
    case "FAILED":
    case "failed":
      return "bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/";

    // Bright Red
    case "Cancelled":
    case "Absent":
    case "high":
    case "high priority":
    case "High":
    case "HIGH":
    case "Unassigned":
    case "Not Interested":
    case "rejected":
    case "cancelled":
    case "REVERSED":
    case "Withdrawn by Candidate":
      return "bg-[#FF5247]/10 text-[#FF5247] border border-[#FF5247]";

    // Orange
    case "inProgress":
    case "medium":
    case "MEDIUM":
    case "medium priority":
    case "Repair":
    case "Pending":
    case "PENDING":
    case "Late":
    case "Planned":
    case "In Progress":
    case "IN_PROGRESS":
    case "On Hold":
    case "ON_HOLD":
    case "planned":
    case "EXPIRED":
    case "INITIATED":
      return "bg-[#FBBC04]/10 text-[#FBBC04] border border-[#FBBC04]";

    // Brown
    case "Scheduled":
    case "onHold":
    case "Task":
      return "bg-[#9D7272]/10 text-[#9D7272] border border-[#9D7272]";

    // Purple
    case "Sold":
    case "New":
    case "Rescheduled":
    case "Total Projects":
    case "INVOICE_GENERATED":
    case "Offer Sent":
      return "bg-[#6B4EFF]/10 text-[#6B4EFF] border border-[#6B4EFF]";

    // Blue
    case "Applied":
      return "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]";

    // Cyan
    case "Shortlisted":
    case "Qualified":
    case "Schedule":
    case "UPDATE":
    case "UPDATED":
      return "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]";

    // Amber
    case "Interview":
    case "Hold":
      return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]";

    // Emerald
    case "Offer Accepted":
    case "SENT":
      return "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]";

    // Gray
    case "test":
    case "notStarted":
    case "DRAFT":
      return "bg-[#72879D]/10 text-[#72879D] border border-[#72879D]";

    default:
      return "bg-[#64748B]/10 text-[#64748B] border border-[#64748B]";
  }
};
const StaticStatus = ({
  status,
  statusClassName,
}: {
  status: string;
  statusClassName?: string;
}) => {
  return (
    <div
      className={`w-fit py-1 px-3 rounded-lg font-bold min-w-25 text-center text-font12  capitalize ${getStatusColor(
        status,
      )} ${statusClassName}`}
    >
      {status}
    </div>
  );
};

export default StaticStatus;
