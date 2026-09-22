import PipelineCard from "./PipelineCard";

interface ApplicationPipelineProps {
  reviewing: number;
  shortlisted: number;
  resumeRequested: number;
  forwarded: number;
  selected: number;
}

export default function ApplicationPipeline({
  reviewing,
  shortlisted,
  resumeRequested,
  forwarded,
  selected,
}: ApplicationPipelineProps) {
  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <div>
        <p className="text-sm text-zinc-500">
          Candidate Pipeline
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          Current Application Status
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Overview of candidates across the hiring workflow.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <PipelineCard
          label="New / Reviewing"
          value={reviewing}
        />

        <PipelineCard
          label="Shortlisted"
          value={shortlisted}
        />

        <PipelineCard
          label="Resume Stage"
          value={resumeRequested}
        />

        <PipelineCard
          label="Forwarded"
          value={forwarded}
        />

        <PipelineCard
          label="Selected"
          value={selected}
        />
      </div>
    </section>
  );
}