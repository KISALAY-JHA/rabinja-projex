'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import type { NexDocument } from '@/lib/types';
import { formatFileSize } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface NexFileUploadProps {
  documents: NexDocument[];
  onUploadSimulate?: (file: File) => void;
}

export function NexFileUpload({ documents, onUploadSimulate }: NexFileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [docList, setDocList] = useState<NexDocument[]>(documents);

  const handleSimulateAdd = () => {
    const newDoc: NexDocument = {
      id: `doc-${Date.now()}`,
      workspaceId: 'nex-ws-1',
      fileName: 'Architecture_System_Specs.pdf',
      fileType: 'application/pdf',
      fileSize: 1840000,
      status: 'ready',
      uploadedAt: new Date().toISOString(),
      processedAt: new Date().toISOString(),
    };
    setDocList([newDoc, ...docList]);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? 'border-nex-primary bg-nex-accent-light/40'
            : 'border-border bg-bg-card hover:border-nex-accent hover:bg-bg-card-warm'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-nex-accent-light text-nex-primary flex items-center justify-center mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-text-primary">
              Upload Project Evidence & Artifacts
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Drag and drop your slide decks, technical papers (PDF), architecture diagrams (PNG/JPEG), or code files.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSimulateAdd}
              className="border-nex-primary text-nex-primary hover:bg-nex-accent-light text-xs"
            >
              + Simulate Document Upload
            </Button>
          </div>

          <p className="text-[10px] text-text-muted">
            Max file size: 50MB • All documents encrypted & sandboxed
          </p>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted">
          Audited Documents in Workspace ({docList.length})
        </h5>

        <div className="space-y-2">
          {docList.map((doc) => (
            <Card
              key={doc.id}
              className="p-3.5 bg-bg-card border-border flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-hover text-nex-primary flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h6 className="text-xs font-bold text-text-primary truncate">
                    {doc.fileName}
                  </h6>
                  <p className="text-[11px] text-text-muted">
                    {formatFileSize(doc.fileSize)} • {doc.fileType.split('/')[1] || doc.fileType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {doc.status === 'ready' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success-light px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Indexed & Parsed</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-warning bg-warning-light px-2 py-0.5 rounded">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Processing</span>
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
