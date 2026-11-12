from __future__ import annotations
from datetime import date, datetime
from pydantic import BaseModel, ConfigDict, Field


class FactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=180)
    value: str = Field(min_length=1, max_length=500)
    source: str = Field(default="Source not attached", max_length=700)
    scope: str = Field(default="All channels", max_length=300)
    effective_date: str | None = None
    approved_by: str = "Ayan Sharma"


class FactOut(FactCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    version: int
    active: bool
    created_at: datetime


class ClaimCreate(BaseModel):
    wording: str = Field(min_length=3, max_length=2000)
    asset_name: str = Field(default="Registered claim", max_length=300)
    source: str = Field(default="No source attached", max_length=1000)
    issuer: str = Field(default="", max_length=250)
    scope: str = Field(default="Scope not specified", max_length=500)
    source_date: str = ""
    expires_at: str = ""


class ClaimOut(ClaimCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    evidence_status: str
    created_at: datetime


class ReviewDecision(BaseModel):
    action: str = Field(pattern="^(confirm|dismiss|correction|clarify|approve|resolve)$")
    owner: str | None = Field(default=None, min_length=1, max_length=120)
    comment: str = ""


class ReviewAssignment(BaseModel):
    owner: str = Field(min_length=1, max_length=120)
    due_date: date | None = None
    comment: str = Field(default="", max_length=1000)


class EvidenceUpdate(BaseModel):
    source: str = Field(min_length=1, max_length=1000)
    issuer: str = ""
    scope: str = "Scope not specified"
    source_date: str = ""
    expires_at: str = ""
