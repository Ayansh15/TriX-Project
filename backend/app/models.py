from __future__ import annotations

from datetime import datetime, timezone
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, Boolean, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


class Fact(Base):
    __tablename__ = "facts"
    __table_args__ = (Index("ix_fact_name_version", "name", "version"),)
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(180), index=True)
    value: Mapped[str] = mapped_column(String(500))
    source: Mapped[str] = mapped_column(String(700), default="Source not attached")
    scope: Mapped[str] = mapped_column(String(300), default="All channels")
    version: Mapped[int] = mapped_column(Integer, default=1)
    active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    effective_date: Mapped[str | None] = mapped_column(String(40), nullable=True)
    approved_by: Mapped[str] = mapped_column(String(120), default="Workspace admin")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)


class Asset(Base):
    __tablename__ = "assets"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(300), index=True)
    media_type: Mapped[str] = mapped_column(String(80), default="text/plain")
    channel: Mapped[str] = mapped_column(String(100), default="Registered content")
    filename: Mapped[str | None] = mapped_column(String(300), nullable=True)
    extracted_text: Mapped[str] = mapped_column(Text, default="")
    processing_status: Mapped[str] = mapped_column(String(100), default="Indexed")
    extraction_method: Mapped[str] = mapped_column(String(100), default="Text")
    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    findings: Mapped[list["Finding"]] = relationship(back_populates="asset")


class Finding(Base):
    __tablename__ = "findings"
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    asset_id: Mapped[int | None] = mapped_column(ForeignKey("assets.id"), nullable=True, index=True)
    fact_id: Mapped[int | None] = mapped_column(ForeignKey("facts.id"), nullable=True)
    kind: Mapped[str] = mapped_column(String(80), default="change_impact", index=True)
    title: Mapped[str] = mapped_column(String(250))
    severity: Mapped[str] = mapped_column(String(20), default="Medium")
    status: Mapped[str] = mapped_column(String(60), default="New", index=True)
    detected_value: Mapped[str] = mapped_column(String(500), default="")
    approved_value: Mapped[str] = mapped_column(String(500), default="")
    excerpt: Mapped[str] = mapped_column(Text, default="")
    reason: Mapped[str] = mapped_column(Text, default="")
    suggested_action: Mapped[str] = mapped_column(Text, default="")
    confidence: Mapped[str] = mapped_column(String(20), default="Medium")
    match_type: Mapped[str] = mapped_column(String(80), default="Exact")
    owner: Mapped[str] = mapped_column(String(120), default="Unassigned")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    asset: Mapped[Asset | None] = relationship(back_populates="findings")


class Claim(Base):
    __tablename__ = "claims"
    id: Mapped[int] = mapped_column(primary_key=True)
    wording: Mapped[str] = mapped_column(Text)
    asset_name: Mapped[str] = mapped_column(String(300), default="Registered claim")
    source: Mapped[str] = mapped_column(String(1000), default="No source attached")
    issuer: Mapped[str] = mapped_column(String(250), default="")
    scope: Mapped[str] = mapped_column(String(500), default="Scope not specified")
    source_date: Mapped[str] = mapped_column(String(80), default="")
    expires_at: Mapped[str] = mapped_column(String(80), default="")
    evidence_status: Mapped[str] = mapped_column(String(80), default="Needs Verification", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)


class AuditEvent(Base):
    __tablename__ = "audit_events"
    id: Mapped[int] = mapped_column(primary_key=True)
    actor: Mapped[str] = mapped_column(String(120), default="Workspace admin")
    event_type: Mapped[str] = mapped_column(String(100), index=True)
    summary: Mapped[str] = mapped_column(String(500))
    details: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, index=True)
